import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from "ManageWebpartWebPartStrings";
import ManageWebpart from "./components/ManageWebpart";
import {
  IManageWebpartProps,
  IWebpartDetail
} from "./components/IManageWebpartProps";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import {
  ClientsidePageFromFile,
  ClientsideText,
  CreateClientsidePage,
  ClientsideWebpart,
  IClientsidePage
} from "@pnp/sp/clientside-pages";

export interface IManageWebpartWebPartProps {
  description: string;
}

export default class ManageWebpartWebPart extends BaseClientSideWebPart<
  IManageWebpartWebPartProps
> {
  public render(): void {
    let webpartDetails = this.GetAllWebpart();
    webpartDetails.then(wp => {
      const element: React.ReactElement<IManageWebpartProps> = React.createElement(
        ManageWebpart,
        {
          description: this.properties.description,
          webpart: wp
        }
      );
      ReactDom.render(element, this.domElement);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    // let webpartDetails = this.properties.webpart;
    // let ddDetails = [];

    // webpartDetails.forEach(wp => {
    //   ddDetails.push({
    //     key: wp.key,
    //     text: wp.text
    //   });

    // webpartDetails.forEach(wp => {
    //   // wp.map((item, key) => {
    //   ddDetails.push({
    //     key: wp.key,
    //     value: wp.text
    //   });
    //   //});

    //   console.log("sfasf");
    //   console.log(ddDetails);
    //   return {
    //     pages: [
    //       {
    //         header: {
    //           description: strings.PropertyPaneDescription
    //         },
    //         groups: [
    //           {
    //             groupName: strings.BasicGroupName,
    //             groupFields: [
    //               PropertyPaneTextField("description", {
    //                 label: strings.DescriptionFieldLabel
    //               }),
    //               PropertyPaneDropdown("DropdownField", {
    //                 label: "All Webparts",
    //                 options: ddDetails
    //               })
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   };
    //});

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
                // PropertyPaneDropdown("DropdownField", {
                //   label: "All Webparts",
                //   options: ddDetails
                // })
              ]
            }
          ]
        }
      ]
    };
  }

  public async GetAllWebpart(): Promise<any[]> {
    console.log(
      "Request Path " + this.context.pageContext.site.serverRequestPath
    );
    // page file
    let pageURL = "/sites/MigrationData/SitePages/Home.aspx";
    const file = sp.web.getFileByServerRelativePath(pageURL); //this.context.pageContext.site.serverRequestPath);
    const page = await ClientsidePageFromFile(file);

    const wpData: IWebpartDetail[] = [];
    const allSection: any[] = [];

    const partDefs = await sp.web.getClientsideWebParts();

    page.sections.forEach(section => {
      allSection.push(section);
      section.columns.forEach(column => {
        column.controls.forEach(control => {
          let wp: IWebpartDetail = {
            text: control.data.webPartData.title,
            key: control.data.webPartData.instanceId,
            position: control.data.position,
            order: control.order,
            column: control.column,
            section: page.sections.length
          };
          wpData.push(wp);
        });
      });
    });
    console.log(wpData);
    console.log(allSection);
    console.log(
      partDefs.filter(c => c.Id === "b5d72f29-b2fb-4343-9ccb-e01037fe9238")
    );
    return wpData;
  }
}
