'use client';
import React from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import Footer from '@/app/components/footer/footer';
import Header from '@/app/components/header/header';
import Leftnav from '@/app/components/leftnav/leftnav';
import WmContent from '@wavemaker/react-runtime/components/page/content';
import WmFooter from '@wavemaker/react-runtime/components/layout/footer';
import WmHeader from '@wavemaker/react-runtime/components/layout/header';
import WmLabel from '@wavemaker/react-runtime/components/basic/label';
import WmLeftPanel from '@wavemaker/react-runtime/components/layout/leftnav';
import WmPage from '@wavemaker/react-runtime/components/page';
import WmPageContent from '@wavemaker/react-runtime/components/page/page-content';
import addPageScript from './pendingorders.script';
import "./pendingorders.css";
import getVariables from './pendingorders.variables';
import getAppVariables from '@/app/app.variables';

const PendingordersComponent = ({ props }: { props: any }) => {
  const fragment = usePageContext().pageContext;
  return (
    <React.Fragment>
      
  <WmPage pagetitle="Pendingorders" name="page1" iswidget="false" >
    <WmHeader iswidget="false" content="header" name="header1">
        
        <Header onRender={(partialContext: any) => {
                  fragment.Widgets.header1 = partialContext;
                }}  />
        
        </WmHeader>
    <WmContent iswidget="false" data-role="page-content" role="main" name="content1" >
      <WmLeftPanel iswidget="false" columnwidth={2} content="leftnav" name="left_panel1">
                  
                  <Leftnav onRender={(partialContext: any) => {
                            fragment.Widgets.left_panel1 = partialContext;
                          }}  />
                  
                  </WmLeftPanel>
      <WmPageContent columnwidth={10} name="page_content1" iswidget="false" >
        <WmLabel type="h1" name="label1" caption="Pending Orders Page" className='h1'/>
      </WmPageContent>
    </WmContent>
    <WmFooter iswidget="false" content="footer" name="footer1">
            
            <Footer onRender={(partialContext: any) => {
                      fragment.Widgets.footer1 = partialContext;
                    }}  />
            
            </WmFooter>
  </WmPage>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  PendingordersComponent,
  addPageScript,
  getVariables,
  {
    componentName: "PendingordersComponent",
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