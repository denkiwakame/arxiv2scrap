const $ = require('jquery');
const _ = require('lodash');
const thenChrome = require('then-chrome');

UI = {
    init: function() {
        const self = this;
        self.setupMDCSelect();
        self.setupMDCSnackBar();
        self.getProjectName();
    },
    setupMDCSelect: function() {
        const self = this;
        const MDCSelect = require('@material/select').MDCSelect;
        const select = new MDCSelect(document.querySelector('.mdc-select'));
        select.listen('MDCSelect:change', () => {
            chrome.storage.local.set({ a2sProjectName: select.value });
            self.snackbar.show({ message: `target project is set to "${select.value}"` });
        });
    },
    setupMDCSnackBar: function() {
        const self = this;
        const MDCSnackbar = require('@material/snackbar').MDCSnackbar;
        self.snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    },
    getProjectName: function() {
        const self = this;
        const api = 'https://scrapbox.io/api/projects';
        $.ajax({
            url     : api,
            type    : 'get',
            dataType: 'json',
            statusCode: {
                200: (data)=> {
                    for (project of data.projects) {
                        const projectName = project.name;
                        const projectDisplayName = project.displayName;
                        $(".mdc-select__native-control").append(`<option value="${projectName}">${projectDisplayName}</option>`);
                    }
                    chrome.storage.local.get("a2sProjectName", (d) => {
                        if (!d.a2sProjectName) return;
                        document.querySelector(`select option[value='${d.a2sProjectName}']`).selected = true;
                    });
                },
                401: (data)=> {
                    // {"name":"NotLoggedInError","message":"You are not logged in yet.","statusCode":401}
                    self.snackbar.show({
                        message: "You are not logged in. Please login and try again",
                        actionText: "Login",
                        actionHandler: () => {
                            thenChrome.tabs.create({
                                url: "https://scrapbox.io/login/google"
                            });
                        }
                    });
                }
            }
        });
    }
};

UI.init();
