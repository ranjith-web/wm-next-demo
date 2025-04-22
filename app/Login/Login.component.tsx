'use client';
import React from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmContainer from '@wavemaker/react-runtime/components/container';
import WmContent from '@wavemaker/react-runtime/components/page/content';
import WmGridcolumn from '@wavemaker/react-runtime/components/container/layout-grid/grid-column';
import WmGridrow from '@wavemaker/react-runtime/components/container/layout-grid/grid-row';
import WmLabel from '@wavemaker/react-runtime/components/basic/label';
import WmLayoutgrid from '@wavemaker/react-runtime/components/container/layout-grid';
import WmPage from '@wavemaker/react-runtime/components/page';
import WmPageContent from '@wavemaker/react-runtime/components/page/page-content';
import WmPicture from '@wavemaker/react-runtime/components/basic/picture';
import addPageScript from './Login.script';
import "./Login.css";
import getVariables from './Login.variables';
import getAppVariables from '@/app/app.variables';

const LoginComponent = ({ props }: { props: any }) => {
  const fragment = usePageContext().pageContext;
  return (
    <React.Fragment>
      
  <WmPage layouttype="one-column" columns="1" name="page1" pagetitle="Login" iswidget="false" >
    <WmContent iswidget="false" data-role="page-content" role="main" name="content1" styles={{"height":"100%"}} >
      <WmPageContent columnwidth={12} name="column1" styles={{"paddingTop":0,"paddingRight":0,"paddingBottom":0,"paddingLeft":0}} className='login' iswidget="false" >
        <WmContainer iswidget="false" name="loginPageContainer" styles={{"backgroundImage":"url(resources/images/imagelists/login-bg.png)","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat","backgroundPosition":"0 0","backgroundAttachment":"fixed","height":"100%","width":"100%"}} className='bg-primary'>
          <WmLayoutgrid iswidget="false" name="loginGrid" styles={{"height":"100%"}}>
            <WmGridrow iswidget="false" name="gridrow7" styles={{"height":"15%"}}>
              <WmGridcolumn iswidget="false" columnwidth={12} name="gridcolumn10_2"></WmGridcolumn>
            </WmGridrow>
            <WmGridrow iswidget="false" name="gridrow6_1">
              <WmGridcolumn iswidget="false" columnwidth={12} name="gridcolumn10_1" styles={{"textAlign":"center","flexDirection":"row","justifyContent":"center","flexWrap":"wrap","paddingBottom":16}} className='col-xs-12'>
                <WmPicture listener={fragment} name="picture1" picturesource="resources/images/logos/logo.png"/>
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow iswidget="false" name="loginGridRow">
              <WmGridcolumn iswidget="false" columnwidth={3} name="gridcolumn8" className='col-xs-1 col-md-4'></WmGridcolumn>
              <WmGridcolumn iswidget="false" name="loginContentColumn" columnwidth={6} className='col-xs-10  col-md-4'>
                <WmContainer iswidget="false" name="container1" styles={{"backgroundColor":"#ffffff","color":"#bdbdbd"}} className='panel'>
                  <WmLabel name="label1" caption="User Login" styles={{"backgroundColor":"#f7f7f7","color":"#1e1e1e","fontSize":20,"textAlign":"center","flexDirection":"row","justifyContent":"center","flexWrap":"wrap","marginTop":0,"marginBottom":0,"paddingTop":8,"paddingBottom":8}} className='p'/>
                </WmContainer>
              </WmGridcolumn>
              <WmGridcolumn iswidget="false" columnwidth={3} name="gridcolumn9" className='col-xs-1  col-md-4'></WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmContainer>
      </WmPageContent>
    </WmContent>
  </WmPage>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  LoginComponent,
  addPageScript,
  getVariables,
  {
    componentName: "LoginComponent",
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