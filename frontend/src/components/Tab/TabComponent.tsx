'use client'
import { Tab } from "react-bootstrap";
import TabProps from './TabProps';
/*
export default function TabComponent(props:TabProps){
    
    return(
        <Tab title={props.title} eventKey={props.eventKey}>
            {
                props.childen
            }
        </Tab>
    )
}
    */
const TabComponent: React.FC<TabProps> = ({eventKey,title,childen,disabled}:any) => {
    return (
        <Tab eventKey={eventKey} title={title} disabled={disabled}>
        {childen}
        </Tab>
    );
  };
  export default TabComponent;