'use client';
import React,{useEffect} from "react";

import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { withPageContext } from "@wavemaker/react-runtime/higherOrder/withPageWrapper";
import Common from '@/app/components/Common/Common'

import WmAlertDialog from '@wavemaker/react-runtime/components/dialogs/alert-dialog';
import WmConfirmDialog from '@wavemaker/react-runtime/components/dialogs/confirm-dialog';
import WmPartial from '@wavemaker/react-runtime/components/page/partial';
import addPartialScript from './Common.script';
import "./Common.css";

import getVariables from './Common.variables';
import getAppVariables from '@/app/app.variables';

const CommonComponent = (props:any) => {
  const { pageContext } = usePageContext();
  const fragment = { ...pageContext, notification: props.notification };

   useEffect(() => {
    if (props?.onRender) {
      props?.onRender(fragment);
    }
  }, []);

  
  return (
    <React.Fragment>
      
  <WmPartial iswidget="false" data-role="partial"  name="CommonPage" >
    <WmAlertDialog   name="CommonAlertDialog" controller="NotificationDialogController" notificationdialog="alert" message={fragment?.notification?.text} title={fragment?.notification?.title} oktext={fragment?.notification?.okButtonText} alerttype={fragment?.notification?.alerttype} onOk={() => {fragment.notification.onOk();}} onClose={() => {fragment.notification.onClose();}}
    />
    <WmConfirmDialog   name="CommonConfirmDialog" controller="NotificationDialogController" notificationdialog="confirm" message={fragment?.notification?.text} title={fragment?.notification?.title} oktext={fragment?.notification?.okButtonText} canceltext={fragment?.notification?.cancelButtonText} onOk={() => {fragment.notification.onOk();}} onCancel={() => {fragment.notification.onCancel();}}
    />
  </WmPartial>

    </React.Fragment>
  );
}

const ComponentWithPage = withPageContext(
  CommonComponent,
  addPartialScript,
  getVariables,
  {
    componentName: "CommonComponent",
    startUpVariables: [],
    startUpActions: [],
    autoUpdateVariables: [],
    getAppVariables,
    type:"PARTIAL",
     }
);

export default React.memo((props: any) => {
  return <ComponentWithPage {...props} />;
});