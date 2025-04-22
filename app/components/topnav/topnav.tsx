'use client';
import React,{useEffect} from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmAnchor from '@wavemaker/react-runtime/components/basic/anchor';
import WmNav from '@wavemaker/react-runtime/components/navbar/nav';
import WmNavItem from '@wavemaker/react-runtime/components/navbar/nav-item';
import WmNavbar from '@wavemaker/react-runtime/components/navbar';
import WmPartial from '@wavemaker/react-runtime/components/page/partial';
import addPartialScript from './topnav.script';
import "./topnav.css";

import getVariables from './topnav.variables';
import getAppVariables from '@/app/app.variables';

const TopnavComponent = (props:any) => {
  const fragment = usePageContext().pageContext;

   useEffect(() => {
    if (props?.onRender) {
      props?.onRender(fragment);
    }
  }, []);

  
  return (
    <React.Fragment>
      
  <WmPartial iswidget="false" data-role="partial"  name="topnav" type="topnav" >
    <WmNavbar 
          name="wm_navbar_eeh9aidj5b">
      <WmNav 
            name="leftTopLinks" type="navbar" className='navbar-left'>
        <WmNavItem
              name="list_home" defaultview="true">
          <WmAnchor caption="Home" name="homeLink" iconclass="wi wi-home" onClick={() => {fragment.Actions.goToPage_Main.invoke();}} className='navAnchorItem '/>
        </WmNavItem>
        <WmNavItem
              name="list_services" defaultview="true">
          <WmAnchor caption="Order" name="orderLink" iconclass="wi wi-list" className='navAnchorItem '/>
        </WmNavItem>
      </WmNav>
      <WmNav 
            name="rightTopLinks" type="navbar" className='navbar-right'>
        <WmNavItem
              name="list_help" defaultview="true">
          <WmAnchor caption="Help" name="helpLink" iconclass="wi wi-help-outline" className='navAnchorItem '/>
        </WmNavItem>
        <WmNavItem
              name="list_logout" defaultview="true">
          <WmAnchor caption="Logout" name="logoutLink" iconclass="wi wi-sign-out" onClick={() => {fragment.Actions.logoutAction.invoke();}} className='navAnchorItem '/>
        </WmNavItem>
      </WmNav>
    </WmNavbar>
  </WmPartial>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  TopnavComponent,
  addPartialScript,
  getVariables,
  {
    componentName: "TopnavComponent",
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