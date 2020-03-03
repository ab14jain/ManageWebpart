import * as React from "react";
import styles from "./ManageWebpart.module.scss";
import { IManageWebpartProps, IWebpartDetail } from "./IManageWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
export interface IDropdownControlledState {
  selectedItem?: { key: string | number | undefined };
}
export default class ManageWebpart extends React.Component<
  IManageWebpartProps,
  {}
> {
  public state: IDropdownControlledState = {
    selectedItem: undefined
  };

  public render(): React.ReactElement<IManageWebpartProps> {
    const { selectedItem } = this.state;
    const items = this.props.webpart.map((item, key) => (
      <li key={item.key}>
        {item.text}
        {item.position.zoneIndex}
        {item.position.sectionIndex}
        {item.position.controlIndex}
        {item.position.sectionFactor}
        {item.position.layoutIndex}
        {item.section}
      </li>
    ));

    //const webpartTitle = this.props.webpart.map(wp => wp.text);
    let ddDetails: IDropdownOption[] = [];
    let sectionDetails = [];
    let controlDetails = [];
    let sectionFactorDetails = [];
    this.props.webpart.forEach(wp => {
      ddDetails.push({
        key: wp.text,
        text: wp.text
      });
      sectionDetails.push({
        key: wp.text,
        text: wp.position.sectionIndex
      });
      sectionDetails = sectionDetails.filter(
        (n, i) => sectionDetails.indexOf(n) === i
      );
      controlDetails.push({
        key: wp.text,
        text: wp.position.controlIndex
      });
      controlDetails = controlDetails.filter(
        (n, i) => controlDetails.indexOf(n) === i
      );
      sectionFactorDetails.push({
        key: wp.text,
        text: wp.position.sectionFactor
      });
      sectionFactorDetails = sectionFactorDetails.filter(
        (n, i) => sectionFactorDetails.indexOf(n) === i
      );
    });

    return (
      <div className={styles.manageWebpart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>{items}</div>
            <div>
              <div>
                <Dropdown
                  label="Wbparts"
                  selectedKey={selectedItem ? selectedItem.key : undefined}
                  onChange={this._onChange}
                  placeholder="Select an option"
                  options={[
                    {
                      key: "inUseWebparts",
                      text: "Webparts",
                      itemType: DropdownMenuItemType.Header
                    },
                    ...ddDetails,
                    {
                      key: "divider_1",
                      text: "-",
                      itemType: DropdownMenuItemType.Divider
                    },
                    {
                      key: "availableWebpart",
                      text: "More Webparts",
                      itemType: DropdownMenuItemType.Header
                    },
                    { key: "broccoli", text: "Broccoli" },
                    { key: "carrot", text: "Carrot" },
                    { key: "lettuce", text: "Lettuce" }
                  ]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Section"
                  selectedKey={selectedItem ? selectedItem.key : undefined}
                  onChange={this._onChange}
                  placeholder="Select an option"
                  options={[...sectionDetails]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Order"
                  selectedKey={selectedItem ? selectedItem.key : undefined}
                  onChange={this._onChange}
                  placeholder="Select an option"
                  options={[...controlDetails]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Column Factor"
                  selectedKey={selectedItem ? selectedItem.key : undefined}
                  onChange={this._onChange}
                  placeholder="Select an option"
                  options={[...sectionFactorDetails]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private _onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    console.log(
      `Selection change: ${item.text} ${
        item.selected ? "selected" : "unselected"
      }`
    );
    this.setState({ selectedItem: item });
  };
}
