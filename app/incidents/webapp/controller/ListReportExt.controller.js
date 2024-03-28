sap.ui.define([
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    "sap/ui/core/mvc/ControllerExtension",
  ], (MessageToast, MessageBox, ControllerExtension) => ControllerExtension.extend('ns.incidents.controller.ListReportExt', {
    async openDiagram() {
        if (!this.oUploadDialog) {
          this.oUploadDialog = await this.base.getExtensionAPI().loadFragment({
            name: 'ns.incidents.ext.fragment.UploadDiagram',
            controller: this
          });
        }
        this.oUploadDialog.open();
      },

    onInit() {
        console.log("Hallo");
    }
  }));