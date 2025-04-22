'use client';
import React,{useEffect} from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmGridcolumn from '@wavemaker/react-runtime/components/container/layout-grid/grid-column';
import WmGridrow from '@wavemaker/react-runtime/components/container/layout-grid/grid-row';
import WmLayoutgrid from '@wavemaker/react-runtime/components/container/layout-grid';
import WmPartial from '@wavemaker/react-runtime/components/page/partial';
import WmPicture from '@wavemaker/react-runtime/components/basic/picture';
import addPartialScript from './header.script';
import "./header.css";

import getVariables from './header.variables';
import getAppVariables from '@/app/app.variables';

const HeaderComponent = (props:any) => {
  const fragment = usePageContext().pageContext;

   useEffect(() => {
    if (props?.onRender) {
      props?.onRender(fragment);
    }
  }, []);

  
  return (
    <React.Fragment>
      
  <WmPartial iswidget="false" data-role="partial"  name="header" type="header" >
    <WmLayoutgrid iswidget="false" name="headerlayout">
      <WmGridrow iswidget="false" name="headerrow">
        <WmGridcolumn iswidget="false" name="headerleft" columnwidth={8} styles={{"textAlignVertical":"middle"}}>
          <WmPicture listener={fragment} picturesource="https://dh2dw20653ig1.cloudfront.net/assets/wm-brand-logo.png" name="AppLogo"/>
        </WmGridcolumn>
        <WmGridcolumn iswidget="false" name="headerright" columnwidth={4} paddingunit="em" styles={{"textAlign":"right","flexDirection":"row","justifyContent":"flex-end","flexWrap":"wrap","textAlignVertical":"middle"}}>
        </WmGridcolumn>
      </WmGridrow>
    </WmLayoutgrid>
  </WmPartial>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  HeaderComponent,
  addPartialScript,
  getVariables,
  {
    componentName: "HeaderComponent",
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