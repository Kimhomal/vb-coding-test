import {
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';
import Msg from './msg';
import moment from 'moment';

const Chat = ({ chatData }) => {
  const [list, setList] = useState([]);
  const [submitActive, setSubmitActive] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const msgBoxRef = useRef();
  const msgInputRef = useRef();

  const handleSubmit = () => {
    if (!msgInputRef.current) return;

    const value = msgInputRef.current.value;

    if (value) {
      setList([
        ...list,
        {
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          id: Date.now(),
          msg: {
            mtype: 'text',
            content: value,
          },
          photo_url:
            'https://photo.vanillabridge.com/app_photos/agent_woman.jpg',
          user_id: 1,
          user_name: '소개녀',
        },
      ]);
      msgInputRef.current.value = '';
      setSubmitActive(false);
    }
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClick = (event) => {
    handleSubmit();
  };

  const handleSnack = (bool) => {
    setSnackOpen(bool);
  };

  useEffect(() => {
    chatData.getDatas().then((result) => {
      setList(result);
      console.log(result);
    });
  }, [chatData]);

  useEffect(() => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [list]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerWrap}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </header>
      <section ref={msgBoxRef} className={styles.wrapper}>
        {list
          .map((item, index, array) =>
            item.msg.mtype === 'text' ? (
              <Fragment key={item.id}>
                {(!index
                  ? true
                  : !moment(array[index - 1].created_at).isSame(
                      item.created_at,
                      'day'
                    )) && (
                  <div className={styles.dateCategory}>
                    <Chip
                      size="small"
                      label={moment(item.created_at).format('YYYY년 MM월 DD일')}
                    ></Chip>
                  </div>
                )}
                <Msg
                  userId={item.user_id}
                  userName={item.user_name}
                  mtype={item.msg.mtype}
                  photoURL={item.photo_url}
                  content={item.msg.content}
                  date={item.created_at}
                  handleSnack={handleSnack}
                ></Msg>
              </Fragment>
            ) : null
          )
          .filter(Boolean)}
      </section>
      <footer className={styles.footer}>
        <div className={styles.inputWrap}>
          <OutlinedInput
            inputRef={msgInputRef}
            className={styles.input}
            onKeyPress={onKeyPress}
            onChange={(event) => {
              setSubmitActive(!!event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="message submit"
                  edge="end"
                  color="primary"
                  onClick={handleClick}
                  disabled={!submitActive}
                >
                  <ArrowUpwardIcon />
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </div>
      </footer>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackOpen}
        onClose={() => handleSnack(false)}
        autoHideDuration={2000}
        message="클립보드에 복사되었습니다"
      />
    </div>
  );
};

export default Chat;
