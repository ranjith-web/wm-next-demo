'use client';
import React,{useEffect} from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmGridcolumn from '@wavemaker/react-runtime/components/container/layout-grid/grid-column';
import WmGridrow from '@wavemaker/react-runtime/components/container/layout-grid/grid-row';
import WmLabel from '@wavemaker/react-runtime/components/basic/label';
import WmLayoutgrid from '@wavemaker/react-runtime/components/container/layout-grid';
import WmPartial from '@wavemaker/react-runtime/components/page/partial';
import addPartialScript from './footer.script';
import "./footer.css";

import getVariables from './footer.variables';
import getAppVariables from '@/app/app.variables';

const FooterComponent = (props:any) => {
  const fragment = usePageContext().pageContext;

   useEffect(() => {
    if (props?.onRender) {
      props?.onRender(fragment);
    }
  }, []);

  
  return (
    <React.Fragment>
      
  <WmPartial iswidget="false" data-role="partial"  name="footer" type="footer" >
    <WmLayoutgrid iswidget="false" name="footerlayout">
      <WmGridrow iswidget="false" name="footerrow">
        <WmGridcolumn iswidget="false" columnwidth={6} name="footerleft" styles={{"textAlignVertical":"bottom"}}>
        </WmGridcolumn>
        <WmGridcolumn iswidget="false" columnwidth={6} name="footerright" styles={{"textAlign":"right","flexDirection":"row","justifyContent":"flex-end","flexWrap":"wrap","textAlignVertical":"bottom"}}>
          <WmLabel caption="Copyright 2024 [company name]" name="copyright" styles={{"textAlign":"right"}}/>
        </WmGridcolumn>
      </WmGridrow>
    </WmLayoutgrid>
  </WmPartial>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  FooterComponent,
  addPartialScript,
  getVariables,
  {
    componentName: "FooterComponent",
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