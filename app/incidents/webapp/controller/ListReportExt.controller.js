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
          this.getView().addDependent(this.oUploadDialog);
        }
        this.oUploadDialog.open();
      },

    async onPress(oEvent) {

      let diagramJson;
      await oEvent.getSource().oParent.getObjectBinding().execute().then((oData) => {
        diagramJson = JSON.parse(oEvent.getSource().oParent.getObjectBinding().getBoundContext().getObject().value);
        const jsonModel = new sap.ui.model.json.JSONModel({results: diagramJson});

        sap.ui.getCore().byId("idVizFrame").setModel(jsonModel);
      });
      console.log(diagramJson);
    },

    onUploadDialogClose() {
      this.oUploadDialog.close();
    }

      /*
      let diagramJson;
      const Query = oEvent.getSource().getParent().getAggregation("items").filter((item) => item.getId() === "_IDGenTextArea1").pop().getValue();
      this.base.editFlow.invokeAction("/diagram", {model:this.getView().getModel(), requiresNavigation: false, 
        skipParameterDialog: true,parameterValues: [
          { name: 'Query', value: Query},
        ],}).then((oData) => {
          diagramJson = oData;
          this.getView().getModel().setProperty("/diagramJson", diagramJson);
        }).catch((error) => console.error(error))
      */

      //oEvent.getSource().oParent.getObjectBinding().setParameter("Query", "Hello").execute();
      // this.getView().byId("getUserQuery").getObjectBinding().execute();

    /*
    onInit() {
        console.log("Hallo");
    }
    */
  }));