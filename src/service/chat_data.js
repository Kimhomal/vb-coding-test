import moment from 'moment';

const DATEFORMAT = 'YYYY-MM-DD HH:mm:ss';
class ChatData {
  constructor() {
    this.list = [];
    this.current = 0;
  }

  async getDatas() {
    const result = await fetch('http://test.vanillabridge.com/test_data')
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return [];
      });

    if (Array.isArray(result)) {
      this.dataSort(result);
    }

    return result;
  }

  dataSort(arr) {
    arr.sort((a, b) => {
      if (
        moment(a.created_at, DATEFORMAT).isBefore(
          moment(b.created_at, DATEFORMAT)
        )
      ) {
        return -1;
      }

      if (
        moment(a.created_at, DATEFORMAT).isAfter(
          moment(b.created_at, DATEFORMAT)
        )
      ) {
        return 1;
      }

      if (
        moment(a.created_at, DATEFORMAT).isSame(
          moment(b.created_at, DATEFORMAT)
        )
      ) {
        return 0;
      }
    });
  }
}

export default ChatData;
