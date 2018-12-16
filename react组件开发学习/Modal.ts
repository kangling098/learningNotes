import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ButtonType, NativeButtonProps } from '../button/button';

export interface ModalProps {
    // 对话框是否课件
    visible?: boolean;
    // 确定按钮loadiung状态
    confirmLoading?: boolean;
    // 标题
    title?: React.ReactNode | string;
    // 是否显示右上角的关闭按钮
    closable?: boolean;
    // 点击确定回调
    onOk?: (e: React.MouseEvent<any>)=>void;
    // 点击模态框右上角×、取消按钮、Props.maskClosable值为true时的遮罩层或键盘按下Esc时的回调
    onCancel?: (e: React.MouseEvent<any>) => void;
    afterClose?: () => void;
    //  是否垂直居中
    centered?: boolean;
    // 宽度
    width?: string|number;
    // 高度
    height?: string|number;
    // 底部内容
    footer?: React.ReactNode;
    // 确认按钮文字
    okText?: string;
    // 确认按钮类型
    okType?: ButtonType;
    // 取消按钮文字
    cancelText?: string;
    // 点击蒙层是否允许关闭
    maskClosable?: boolean;
    okButtonProps?: NativeButtonProps;
    cancelButtonProps?: NativeButtonProps;
    destroyOnClose?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    className?: string;
    getContainer?: (instance: React.ReactInstance) => HTMLElement;
    zIndex?: number;
    bodyStyle?: React.CssProperties;
    maskStyle?: React.CssProperties;
    mask?: boolean;
    keyboard?: boolean;
    wrapProps?: any;
    prefixCls?: string;
}