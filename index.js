var downloadBtn = document.getElementById('download');

downloadBtn.onclick = function (e) {
  handleDownload();
}

function handleDownload() {
  const fileName = '下载列表';
  const data = [];
  const baseColumns = [
    {
      dataIndex: 'name',
      title: '名称',
    },
    {
      dataIndex: 'status',
      title: '状态',
    },
  ];
  const tableData = [
    {
      name: 'xxx',
      status: 1,
    },
    {
      name: 'lll',
      status: 2,
    },
  ];
  for (let i = 0; i < tableData.length; i++) {
    const dataLine = [];
    for (let j = 0; j < baseColumns.length; j++) {
      let tempData = '';
      if (baseColumns[j].dataIndex === 'status') {
        tempData = tableData[i][baseColumns[j].dataIndex] === 1 ? '正常' : '异常';
      } else {
        tempData = tableData[i][baseColumns[j].dataIndex];
      }
      dataLine.push(
        {
          // value: tempData.indexOf(',') > -1 ? tempData.replace(',', '/') : tempData,
          value: tempData,
        });
    }
    data.push(dataLine);
  }
  const columns = [];
  baseColumns.forEach((item) => {
    columns.push({
      value: item.title,
    });
  });

  this.jsonToCsv(data, fileName, columns);
}

function jsonToCsv(JSONData, FileName, ShowLabel) {
  // 先转化json
  const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
  const str = [];
  const tempstr = [];
  for (let i = 0, l = ShowLabel.length; i < l; i++) {
    tempstr.push(ShowLabel[i].value);
  }
  str.push(`${tempstr.join(',')}\n`);
  for (let i = 0; i < arrData.length; i++) {
    const temp = [];
    for (let j = 0; j < Object.keys(arrData[i]).length; j++) {
      const value = arrData[i][Object.keys(arrData[i])[j]].value === '.' ? '' : arrData[i][Object.keys(arrData[i])[j]].value;
      temp.push(value);
    }
    str.push(`${temp.join(',')}\n`);
  }
  const url = `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(str.join('').replace(/˙/g, ''))}`;
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.style = 'visibility:hidden';
  downloadLink.download = `${FileName}.csv`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}