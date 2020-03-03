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
  selectedWebpart?: { key: string | number | undefined };
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
    selectedSection: undefined,
    selectedOrder: undefined,
    selectedFactor: undefined,
  };

  public render(): React.ReactElement<IManageWebpartProps> {
    const { selectedWebpart,selectedSection,selectedOrder,selectedFactor } = this.state;
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
    let controlDetails = [];
    let sectionFactorDetails = [];
    let sectionDetailsDistinct =[];
    let controlDetailsDistinct = [];
    let sectionFactorDetailsDistinct = [];
    this.props.webpart.forEach(wp => {
      ddDetails.push({
        key: wp.text,
        text: wp.text
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

    sectionDetailsDistinct =  this.removeDuplicates(sectionDetails, "text"); // sectionDetails.filter((value, index, self) => self.indexOf(value.text) === index);
    controlDetailsDistinct =  this.removeDuplicates(controlDetails, "text"); // controlDetails.filter((value, index, self) => self.indexOf(value.text) === index);
    sectionFactorDetailsDistinct = this.removeDuplicates(sectionFactorDetails, "text"); // sectionFactorDetails.filter((value, index, self) => self.indexOf(value.text) === index);
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
          <div className={styles.row}>
            <div>
              <div>
                <Dropdown
                  label="Webparts"
                  selectedKey={selectedWebpart ? selectedWebpart.key : undefined}
                  onChange={this._onChangeWebpart}
                  placeholder="Select an option"
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
                  label="Section"
                  selectedKey={selectedSection ? selectedSection.key: undefined}
                  onChange={this._onChangeSection}
                  placeholder="Select an option"
                  options={[...sectionDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Order"
                  selectedKey={selectedOrder ? selectedOrder.key : undefined}
                  onChange={this._onChangeOrder}
                  placeholder="Select an option"
                  options={[...controlDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
              <div>
                <Dropdown
                  label="Column Factor"
                  selectedKey={selectedFactor ? selectedFactor.key : undefined}
                  onChange={this._onChangeFactor}
                  placeholder="Select an option"
                  options={[...sectionFactorDetailsDistinct]}
                  styles={{ dropdown: { width: 300 } }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
  }

  private _onChangeWebpart = (evt, item) => {
    if(item.text){
      let selectedWebpart = this.props.webpart.filter(wp => wp.text === item.text)[0];
      this.setState({
        selectedWebpart: item,
        selectedSection: {key: selectedWebpart.position.sectionIndex, text:selectedWebpart.position.sectionIndex},
        selectedOrder: {key: selectedWebpart.position.controlIndex, text:selectedWebpart.position.controlIndex},
        selectedFactor: {key: selectedWebpart.position.sectionFactor,text:selectedWebpart.position.sectionFactor}
      });
    }
  };

  private _onChangeSection = (evt, item) => {
    this.setState({
      selectedSection: item.text,
    });
  };

  private _onChangeOrder = (evt, item) => {
    this.setState({
      selectedOrder: item.text,
    });
  };

  private _onChangeFactor = (evt, item) => {
    this.setState({
      selectedFactor: item.text,
    });
  };
}
