import { Avatar, Dialog, DialogContent } from '@mui/material';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import React, { useState } from 'react';
import styles from './msg.module.css';

moment.updateLocale('ko', {
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? '오전' : '오후';
  },
});

function SimpleDialog(props) {
  const { onClose, open, url } = props;

  const handleClose = () => {
    onClose();
  };

  const handleClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent onClick={handleClick}>
        <img src={url} alt="user" style={{ width: '100%' }}></img>
      </DialogContent>
    </Dialog>
  );
}

const Msg = ({
  userId,
  userName,
  mtype,
  photoURL,
  content,
  date,
  handleSnack,
}) => {
  const [open, setOpen] = useState(false);

  const handleAvatarClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMsgClick = (event) => {
    handleSnack(true);
    copy(event.target.textContent);
  };

  return (
    <div
      className={`${userId === 1 ? styles.myMsg : styles.anotherMsg} ${
        styles.root
      }`}
    >
      {userId !== 1 && (
        <div className={styles.avatarWrap}>
          <Avatar
            alt="user profile"
            src={photoURL}
            sx={{ cursor: 'pointer', flexShrink: 0 }}
            onClick={handleAvatarClick}
          />
        </div>
      )}
      <div className={styles.contentWrap}>
        {userId !== 1 && (
          <span className={styles.contentTitle}>{userName}</span>
        )}
        <div className={styles.msgWrap}>
          <div className={styles.msg} onClick={handleMsgClick}>
            {content.split('\\n').map((text, i) => (i ? [<br />, text] : text))}
          </div>
          <span className={styles.date}>
            {moment(date, 'YYYY-MM-DD HH:mm:ss').locale('ko').format('A h:mm')}
          </span>
        </div>
      </div>
      <SimpleDialog open={open} onClose={handleClose} url={photoURL} />
    </div>
  );
};

export default Msg;
