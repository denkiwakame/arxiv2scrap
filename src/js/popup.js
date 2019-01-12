const $ = require('jquery');
const _ = require('lodash');
const thenChrome = require('then-chrome');
const pdfjsLib = require('pdfjs-dist');

UI = {
    init: function() {
        const self = this;
        self.setupMDCTextFields();
        self.setupMDCChipSet();
        self.setupMDCButtons();
        self.setupMDCSnackBar();
        self.setupProgressBar();
    },
    invokeLoginAlert: function() {
        const self = this;
        self.snackbar.show({
            message: "You are not logged in. Please login and try again",
            actionText: "Login",
            actionHandler: () => {
                thenChrome.tabs.create({
                    url: "https://scrapbox.io/login/google"
                });
            }
        });
    },
    checkAuth: function() {
        const self = this;
        const api = 'https://scrapbox.io/api/projects';
        $.ajax({
            url     : api,
            type    : 'get',
            dataType: 'json',
            statusCode: {
                200: ()=> { App.getCurrentTabUrl(); },
                401: ()=> { self.invokeLoginAlert(); }
            }
        });
    },
    checkProject: function() {
        const self = this;
        chrome.storage.local.get("a2sProjectName", (d) => {
            if (d.a2sProjectName) return;
            self.snackbar.show({
                message: "Target scrapbox project is undefined. See arxiv2scap options"
            });
            $("#a2s-save").disabled = true;
        });
    },
    setupProgressBar: function() {
        const self = this;
        const MDCLinearProgress = require('@material/linear-progress').MDCLinearProgress;
        self.progressbar = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));
        self.hideProgressBar();
    },
    hideProgressBar: function() {
        $("#js-progressbar").hide();
    },
    showProgressBar: function() {
        $("#js-progressbar").show();
    },
    setupMDCSnackBar: function() {
        const self = this;
        const MDCSnackbar = require('@material/snackbar').MDCSnackbar;
        self.snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    },
    setupMDCButtons: function() {
        const self = this;
        const MDCIconButtonToggle = require('@material/icon-button').MDCIconButtonToggle;

        var toggleButton = new MDCIconButtonToggle(document.getElementById('a2s-save'));
        $("#a2s-save").on("click", ()=> {
            const title = $("#a2s-paper-title")[0].value;
            const abst  = $("#a2s-paper-abstract")[0].value;
            const tags  = _.map(self.chipSet.chips, (chip) => {
                                return "#" + document.getElementById(chip.id).dataset.tag;
                            }).join(' ');
            const body = tags + "\n" + self.url + "\n>" + abst + "\n";

            chrome.storage.local.get("a2sProjectName", (d) => {
                const projectUrl = `https://scrapbox.io/${d.a2sProjectName}`;
                thenChrome.tabs.create({
                    url: projectUrl + '/' + encodeURIComponent(title) + '?body=' + encodeURIComponent(body)
                });
            });
        });
    },
    setupMDCTextFields: function() {
        const MDCTextField = require('@material/textfield').MDCTextField;
        const textfields = $('.mdc-text-field');
        for (const tf of textfields) { new MDCTextField(tf); }
    },
    _str2elem: function(str) {
        const div = document.createElement('div');
        div.innerHTML = str.trim();
        return div.firstChild;
    },
    setupMDCChipSet: function() {
        const self = this;
        const MDCChipSet = require('@material/chips').MDCChipSet;
        const chipSetEl = $('.mdc-chip-set')[0];
        self.chipSet = new MDCChipSet(chipSetEl);
        $('#a2s-tags').on('keydown', (evt) => {
            if (evt.key != 'Enter' && evt.key != ' ') return;
            const templateStr = require('../html/_chip.html');
            const compiled = _.template(templateStr);
            const chipEl = self._str2elem( compiled({ tag: $("#a2s-tags")[0].value }) );
            $(".mdc-chip-set").append(chipEl);
            self.chipSet.addChip(chipEl);
            $("#a2s-tags")[0].value = '';
        });
    },
    setFormContents: function(data) {
        const self = this;
        self.url = data.url;
        $("#a2s-paper-title").val(data.paperTitle).focus();
        $("#a2s-paper-abstract").val(data.abstract).focus();
        for (author of data.authors) {
            const templateStr = require('../html/_chip.html');
            const compiled = _.template(templateStr);
            const chipEl = self._str2elem( compiled({ tag: author.trim().replace(/\ +/g, '_') }) );
            $(".mdc-chip-set").append(chipEl);
            self.chipSet.addChip(chipEl);
        }
    }
};

App = {
    api: "http://export.arxiv.org/api/query/search_query",
    isArxivUrl: function (url) {
        return url && url.indexOf('https://arxiv.org') === 0;
    },
    isPDF: function(url) {
        return url && url.split(".").pop() === "pdf";
    },
    parseArXivId: function(str) {
        const paperId = str.match(/\d+.\d+/);
        return paperId;
    },
    getCurrentTabUrl: function() {
        const self = this;
        chrome.tabs.query({ active:true, currentWindow:true }, (tabs) => {
            const url = tabs[0].url;
            self.getPaperInfo(url);
        });
    },
    getPaperInfo: function(url) {
        const self = this;
//         const url_ = "http://openaccess.thecvf.com/content_ECCV_2018/papers/Martin_Sundermeyer_Implicit_3D_Orientation_ECCV_2018_paper.pdf";
//         self.getPDFInfo(url_);
        if (self.isArxivUrl(url)) return self.getArXivInfo(url);
        if (self.isPDF(url)) return self.getPDFInfo(url); 
    },
    formatString: function(str) {
        return str.trim().replace(/\n/g,' ').replace(/\ +/g, ' ');
    },
    getArXivInfo: function(url) {
        UI.showProgressBar();
        const self = this;
        const paperId = self.parseArXivId(url);
        $.ajax({
            url     : self.api,
            type    : 'get',
            dataType: 'xml',
            data    : {
                id_list: paperId.toString()
            },
            statusCode: {
                200: (data)=> {
                    const $entry= $(data).find("entry");
                    const paperTitle = self.formatString($entry.find("title")[0].textContent);
                    const abst = self.formatString($entry.find("summary")[0].textContent);
                    const authors = _.map($entry.find("author"), (a) => { return a.textContent.trim(); });
                    UI.setFormContents({
                        url         : url,
                        paperTitle  : paperTitle,
                        abstract    : abst,
                        authors     : authors
                    });
                    UI.hideProgressBar();
                }
            }
        }).fail(()=> {
            alert("arXiv API request failed");
        });
    },
    getPDFInfo: function(url) {
        UI.showProgressBar();

        const self = this; 
        // Setting worker path to worker bundle.
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjsWorker.bundle.js';
        const pdfLoading = pdfjsLib.getDocument(url);
        pdfLoading.promise.then((pdf)=>{
            pdf.getMetadata().then((d)=>{
                const authors = d.info.Author.trim().split(",");
                const paperTitle = self.formatString(d.info.Title);
                UI.setFormContents({
                    url         : url,
                    paperTitle  : paperTitle,
                    abstract    : '', // TODO
                    authors     : authors
                });
                UI.hideProgressBar();
            }).catch((reason) => {
                console.log(reason);
            });
        }).catch((reason) => {
            alert('PDF load failed');
        });
    }
};

UI.init();
UI.checkProject();
UI.checkAuth();
