import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ManageWebpartWebPartStrings';
import ManageWebpart from './components/ManageWebpart';
import { IManageWebpartProps } from './components/IManageWebpartProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { ClientsidePageFromFile, ClientsideText, CreateClientsidePage, ClientsideWebpart, IClientsidePage } from "@pnp/sp/clientside-pages";


export interface IManageWebpartWebPartProps {
  description: string;
}

export default class ManageWebpartWebPart extends BaseClientSideWebPart<IManageWebpartWebPartProps> {

  public render(): void {

    let webpartDetails = this.GetAllWebpart();
    const element: React.ReactElement<IManageWebpartProps > = React.createElement(
      ManageWebpart,
      {
        description: this.properties.description,
        webpart: webpartDetails
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public async GetAllWebpart(): Promise<any[]> {
    // page file
    const file = sp.web.getFileByServerRelativePath(this.context.pageContext.site.serverRequestPath);
    const page = await ClientsidePageFromFile(file);

    const wpData: any[] = [];
    const allSection: any[] = [];

    const partDefs = await sp.web.getClientsideWebParts();

    page.sections.forEach(section => {
      allSection.push(section);
      section.columns.forEach(column => {
        column.controls.forEach(control => {
          var wp = {
            text: control.data.webPartData.title,
            key: control.data.webPartData.instanceId,
            position: control.data.position,
            order:control.order,
            column: control.column
          };
          wpData.push(wp);
        });

      });
    });
    console.log(wpData);
    console.log(allSection);
    console.log(partDefs.filter(c => c.Id === "b5d72f29-b2fb-4343-9ccb-e01037fe9238"));
    return wpData;
  }
}
