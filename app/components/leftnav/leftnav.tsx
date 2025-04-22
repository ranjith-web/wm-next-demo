'use client';
import React,{useEffect} from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmAnchor from '@wavemaker/react-runtime/components/basic/anchor';
import WmNav from '@wavemaker/react-runtime/components/navbar/nav';
import WmNavItem from '@wavemaker/react-runtime/components/navbar/nav-item';
import WmPartial from '@wavemaker/react-runtime/components/page/partial';
import addPartialScript from './leftnav.script';
import "./leftnav.css";

import getVariables from './leftnav.variables';
import getAppVariables from '@/app/app.variables';

const LeftnavComponent = (props:any) => {
  const fragment = usePageContext().pageContext;

   useEffect(() => {
    if (props?.onRender) {
      props?.onRender(fragment);
    }
  }, []);

  
  return (
    <React.Fragment>
      
  <WmPartial iswidget="false" data-role="partial"  name="leftnav" type="leftnav" >
    <WmNav 
          name="leftnavigation" type="pills" layout="stacked" className='stackedNav '>
      <WmNavItem
            name="list_dashboard" defaultview="true">
        <WmAnchor caption="Dashboard" name="dashboardLink" iconclass="wi wi-bar-graph" onClick={() => {fragment.Actions.goToPage_Main.invoke();}} className='navAnchorItem '/>
      </WmNavItem>
      <WmNavItem
            name="list_order" defaultview="true">
        <WmAnchor caption="Pending Orders" name="orderLink" iconclass="wi wi-file" onClick={() => {fragment.Actions.goToPage_pendingorders.invoke();}} className='navAnchorItem '/>
      </WmNavItem>
      <WmNavItem
            name="list_inventory" defaultview="true">
        <WmAnchor caption="Inventory" name="inventoryLink" iconclass="wi wi-tag" className='navAnchorItem '/>
      </WmNavItem>
      <WmNavItem
            name="list_support" defaultview="true">
        <WmAnchor caption="Support Calls" name="supportLink" iconclass="wi wi-envelope" className='navAnchorItem '/>
      </WmNavItem>
    </WmNav>
  </WmPartial>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  LeftnavComponent,
  addPartialScript,
  getVariables,
  {
    componentName: "LeftnavComponent",
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