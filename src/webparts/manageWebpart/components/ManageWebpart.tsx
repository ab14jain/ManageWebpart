import * as React from "react";
import styles from "./ManageWebpart.module.scss";
import { IManageWebpartProps, IWebpartDetail } from "./IManageWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react";

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
export interface IDropdownControlledState {
  selectedWebpart?: { key: string | number | undefined };
  selectedZone?: { key: string | number | undefined };
  selectedSection?: { key: string | number | undefined };
  selectedOrder?: { key: string | number | undefined };
  selectedFactor?: { key: string | number | undefined };
}
export default class ManageWebpart extends React.Component<
  IManageWebpartProps,
  {}
> {
  public state: IDropdownControlledState = {
    selectedWebpart: undefined,
    selectedZone: undefined,
    selectedSection: undefined,
    selectedOrder: undefined,
    selectedFactor: undefined
  };

  public render(): React.ReactElement<IManageWebpartProps> {
    const {
      selectedWebpart,
      selectedZone,
      selectedSection,
      selectedOrder,
      selectedFactor
    } = this.state;
    const items = this.props.webpart.map((item, key) => (
      <div className={styles.row}>
        <div className={styles.column}>
          <p>{item.text} </p>
        </div>
        <div className={styles.column}>
          <p>{item.position.zoneIndex}</p>
        </div>
        <div className={styles.column}>
          <p>{item.position.sectionIndex}</p>
        </div>
        <div className={styles.column}>
          <p>{item.position.controlIndex}</p>
        </div>
        <div className={styles.column}>
          <p>{item.position.sectionFactor}</p>
        </div>
        {/* <div className={styles.column}>
          <p>{item.section}</p>
        </div> */}
      </div>
    ));

    //const webpartTitle = this.props.webpart.map(wp => wp.text);
    let ddDetails: IDropdownOption[] = [];
    let sectionDetails = [];
    let zoneDetails = [];
    let controlDetails = [];
    let zoneDetailsDistinct = [];
    let sectionFactorDetails = [];
    let sectionDetailsDistinct = [];
    let controlDetailsDistinct = [];
    let sectionFactorDetailsDistinct = [];
    this.props.webpart.forEach(wp => {
      ddDetails.push({
        key: wp.text,
        text: wp.text
      });

      zoneDetails.push({
        key: wp.position.zoneIndex,
        text: wp.position.zoneIndex
      });
      sectionDetails.push({
        key: wp.position.sectionIndex,
        text: wp.position.sectionIndex
      });

      controlDetails.push({
        key: wp.position.controlIndex,
        text: wp.position.controlIndex
      });

      sectionFactorDetails.push({
        key: wp.position.sectionFactor,
        text: wp.position.sectionFactor
      });
    });
    zoneDetailsDistinct = this.removeDuplicates(zoneDetails, "text");
    sectionDetailsDistinct = this.removeDuplicates(sectionDetails, "text"); // sectionDetails.filter((value, index, self) => self.indexOf(value.text) === index);
    controlDetailsDistinct = this.removeDuplicates(controlDetails, "text"); // controlDetails.filter((value, index, self) => self.indexOf(value.text) === index);
    sectionFactorDetailsDistinct = this.removeDuplicates(
      sectionFactorDetails,
      "text"
    ); // sectionFactorDetails.filter((value, index, self) => self.indexOf(value.text) === index);
    console.log("Distinct");
    console.log(sectionFactorDetailsDistinct);
    return (
      <div className={styles.manageWebpart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <p>Webpart Name</p>
            </div>
            <div className={styles.column}>
              <p>Webpart Row</p>
            </div>
            <div className={styles.column}>
              <p>Webpart Column</p>
            </div>
            <div className={styles.column}>
              <p>Webpart Order</p>
            </div>
            <div className={styles.column}>
              <p>Webpart Layout</p>
            </div>
          </div>
          {items}
          <div
            className={styles.row}
            style={{
              paddingLeft: "65px",
              paddingTop: "20px"
            }}
          >
            <div>
              <div>
                <Dropdown
                  label="Webparts"
                  selectedKey={
                    selectedWebpart ? selectedWebpart.key : undefined
                  }
                  onChange={this._onChangeWebpart}
                  placeholder="Select a webpart"
                  options={[
                    {
                      key: "inUseWebparts",
                      text: "In Use Webparts",
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
                    { key: "broccoli", text: "Broccoli" }
                  ]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Row"
                  selectedKey={selectedZone ? selectedZone.key : undefined}
                  onChange={this._onChangeZone}
                  placeholder="Select a row"
                  options={[...zoneDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Column"
                  selectedKey={
                    selectedSection ? selectedSection.key : undefined
                  }
                  onChange={this._onChangeSection}
                  placeholder="Select a column"
                  options={[...sectionDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Order"
                  selectedKey={selectedOrder ? selectedOrder.key : undefined}
                  onChange={this._onChangeOrder}
                  placeholder="Select an order"
                  options={[...controlDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Column Factor"
                  selectedKey={selectedFactor ? selectedFactor.key : undefined}
                  onChange={this._onChangeFactor}
                  placeholder="Select a layout"
                  options={[...sectionFactorDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
            </div>
            <div
              style={{
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              <DefaultButton
                style={{
                  paddingRight: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  padding: "5px"
                }}
                text="Update"
                onClick={this.updatePage.bind(this)}
                allowDisabledFocus
              />

              <DefaultButton
                style={{
                  paddingRight: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  padding: "5px"
                }}
                text="Cancel"
                onClick={this.cancelPage.bind(this)}
                allowDisabledFocus
              />
              {/* <button
                onClick={this.updatePage.bind(this)}
                style={{
                  paddingRight: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  padding: "5px"
                }}
              >
                Update
              </button>
              <button
                onClick={this.cancelPage}
                style={{
                  paddingRight: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  padding: "5px"
                }}
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  private updatePage() {
    console.log("=========Updated Page value start===========");
    console.log(this.state);
    console.log("=========Updated Page value end===========");
  }

  private cancelPage() {}

  private removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  private _onChangeWebpart = (evt, item) => {
    if (item.text) {
      let selectedWebpart = this.props.webpart.filter(
        wp => wp.text === item.text
      )[0];
      this.setState({
        selectedWebpart: item,
        selectedZone: {
          key: selectedWebpart.position.zoneIndex,
          text: selectedWebpart.position.zoneIndex
        },
        selectedSection: {
          key: selectedWebpart.position.sectionIndex,
          text: selectedWebpart.position.sectionIndex
        },
        selectedOrder: {
          key: selectedWebpart.position.controlIndex,
          text: selectedWebpart.position.controlIndex
        },
        selectedFactor: {
          key: selectedWebpart.position.sectionFactor,
          text: selectedWebpart.position.sectionFactor
        }
      });
    }
  };

  private _onChangeZone = (evt, item) => {
    this.setState({
      selectedZone: item
    });
  };

  private _onChangeSection = (evt, item) => {
    this.setState({
      selectedSection: item
    });
  };

  private _onChangeOrder = (evt, item) => {
    this.setState({
      selectedOrder: item
    });
  };

  private _onChangeFactor = (evt, item) => {
    this.setState({
      selectedFactor: item
    });
  };
}
