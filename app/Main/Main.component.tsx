'use client';
import React from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import Footer from '@/app/components/footer/footer';
import Header from '@/app/components/header/header';
import Leftnav from '@/app/components/leftnav/leftnav';
import Topnav from '@/app/components/topnav/topnav';
import WmContent from '@wavemaker/react-runtime/components/page/content';
import WmFooter from '@wavemaker/react-runtime/components/layout/footer';
import WmHeader from '@wavemaker/react-runtime/components/layout/header';
import WmLeftPanel from '@wavemaker/react-runtime/components/layout/leftnav';
import WmPage from '@wavemaker/react-runtime/components/page';
import WmPageContent from '@wavemaker/react-runtime/components/page/page-content';
import WmTopNav from '@wavemaker/react-runtime/components/layout/topnav';
import addPageScript from './Main.script';
import "./Main.css";
import getVariables from './Main.variables';
import getAppVariables from '@/app/app.variables';

const MainComponent = ({ props }: { props: any }) => {
  const fragment = usePageContext().pageContext;
  return (
    <React.Fragment>
      
  <WmPage name="mainpage" pagetitle="Main" iswidget="false" >
    <WmHeader iswidget="false" content="header" name="header">
        
        <Header onRender={(partialContext: any) => {
                  fragment.Widgets.header = partialContext;
                }}  />
        
        </WmHeader>
    <WmTopNav iswidget="false" name="topnav" content="topnav">
                
                <Topnav onRender={(partialContext: any) => {
                          fragment.Widgets.topnav = partialContext;
                        }}  />
                
                </WmTopNav>
    <WmContent iswidget="false" data-role="page-content" role="main" name="content" >
      <WmLeftPanel iswidget="false" columnwidth={2} name="leftpanel" content="leftnav">
                  
                  <Leftnav onRender={(partialContext: any) => {
                            fragment.Widgets.leftpanel = partialContext;
                          }}  />
                  
                  </WmLeftPanel>
      <WmPageContent columnwidth={10} name="mainContent" iswidget="false" ></WmPageContent>
    </WmContent>
    <WmFooter iswidget="false" name="footer" content="footer">
            
            <Footer onRender={(partialContext: any) => {
                      fragment.Widgets.footer = partialContext;
                    }}  />
            
            </WmFooter>
  </WmPage>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  MainComponent,
  addPageScript,
  getVariables,
  {
    componentName: "MainComponent",
    startUpVariables: [],
    startUpActions: [],
    autoUpdateVariables: [],
    getAppVariables,
    type:"PAGE",
    common: Common,
  }
);

export default React.memo((props: any) => {
  return <ComponentWithPage {...props} />;
});