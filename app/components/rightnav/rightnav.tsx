'use client';
import React,{useEffect} from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmAnchor from '@wavemaker/react-runtime/components/basic/anchor';
import WmNav from '@wavemaker/react-runtime/components/navbar/nav';
import WmNavItem from '@wavemaker/react-runtime/components/navbar/nav-item';
import WmPartial from '@wavemaker/react-runtime/components/page/partial';
import addPartialScript from './rightnav.script';
import "./rightnav.css";

import getVariables from './rightnav.variables';
import getAppVariables from '@/app/app.variables';

const RightnavComponent = (props:any) => {
  const fragment = usePageContext().pageContext;

   useEffect(() => {
    if (props?.onRender) {
      props?.onRender(fragment);
    }
  }, []);

  
  return (
    <React.Fragment>
      
  <WmPartial iswidget="false" data-role="partial"  name="rightnav" type="rightnav" >
    <WmNav 
          name="rightnav" type="pills" layout="stacked" className='stackedNav '>
      <WmNavItem
            name="list_task" defaultview="true">
        <WmAnchor caption="Tasks" name="taskLink" className='navAnchorItem '/>
      </WmNavItem>
      <WmNavItem
            name="list_directory" defaultview="true">
        <WmAnchor caption="Directory" name="directoryLink" className='navAnchorItem '/>
      </WmNavItem>
      <WmNavItem
            name="list_people" defaultview="true">
        <WmAnchor caption="People" name="peopleLink" className='navAnchorItem '/>
      </WmNavItem>
    </WmNav>
  </WmPartial>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  RightnavComponent,
  addPartialScript,
  getVariables,
  {
    componentName: "RightnavComponent",
    startUpVariables: [],
    startUpActions: [],
    autoUpdateVariables: [],
    getAppVariables,
    type:"PARTIAL",
    common: Common, }
);

export default React.memo((props: any) => {
  return <ComponentWithPage {...props} />;
});