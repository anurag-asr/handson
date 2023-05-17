import { Modal } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import history from '../historyData';

export default function RouterPrompt(props) {
  const { dispatch } = useContext(AppContext);
  const {
    openPrompt = false,
    title = 'Leave this page',
    description = 'It looks like you have been editing something. If you leave before saving, your changes will be lost.',
    okText = 'Confirm',
    cancelText = 'Cancel',
  } = props;

  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  const currentLocation = useLocation();

  const unblockRef = useRef();

  useEffect(() => {
    if (openPrompt) {
      // eslint-disable-next-line no-undef
      window.onbeforeunload = function () {
        return true;
      };
    }
    unblockRef.current = history?.block((location) => {
      if (openPrompt && location?.pathname !== currentLocation?.pathname) {
        setCurrentPath(location?.pathname);
        setShowPrompt(true);
        return false;
      }
      return true;
    });
    return () => {
      unblockRef?.current();
      // eslint-disable-next-line no-undef
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPrompt]);

  const handleOK = () => {
    if (unblockRef) {
      unblockRef?.current();
    }
    setShowPrompt(false);
    dispatch({
      type: 'SET_SHOW_PROMPT',
      data: false,
    });
    history?.push(currentPath);
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return showPrompt ? (
    <Modal
      title={title}
      open={showPrompt}
      onOk={handleOK}
      okText={okText}
      onCancel={handleCancel}
      cancelText={cancelText}
    >
      {description}
    </Modal>
  ) : null;
}
