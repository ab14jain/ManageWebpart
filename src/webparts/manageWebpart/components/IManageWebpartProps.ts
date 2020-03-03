export interface IManageWebpartProps {
  description: string;
  webpart: any[];
}

export interface IWebpartDetail {
  text: string;
  key: string;
  position: {
    zoneIndex: number;
    sectionIndex: number;
    controlIndex: number;
    sectionFactor: number;
    layoutIndex: number;
  };
  order: number;
  column: any;
  section: number;
}
