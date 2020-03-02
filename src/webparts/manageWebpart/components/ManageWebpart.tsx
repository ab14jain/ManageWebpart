import * as React from 'react';
import styles from './ManageWebpart.module.scss';
import { IManageWebpartProps } from './IManageWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ManageWebpart extends React.Component<IManageWebpartProps, {}> {
  public render(): React.ReactElement<IManageWebpartProps> {
    return (
      <div className={ styles.manageWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              {this.props.webpart.then(wp => <p className={ styles.subTitle }>{wp[0].textZoneIndex}</p>
                // wp.forEach(w => {
                //   <p className={ styles.subTitle }>
                //     Text: w.text
                //     ZoneIndex: w.text
                //     SectionIndex: w.text
                //     ControlIndex: w.text
                //     SectionFactor: w.text
                //     LayoutIndex: w.text
                //     Text: w.text
                //   </p>
                // })
              )}
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
