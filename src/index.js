import 'babel-polyfill';
const Unzip = require('zlibjs/bin/unzip.min').Zlib.Unzip;
const FileType = require('file-type');

const main = async () => {
  // zipファイルを取得
  const _res = await fetch('/files.zip');

  // 解凍
  const _unzip = new Unzip(Buffer.from(await _res.arrayBuffer()));

  // ファイル名一覧
  const _filenames = _unzip.getFilenames();

  for (let filename of _filenames) {
    // ファイル(バイナリ)
    const _buffer = Buffer.from(_unzip.decompress(filename));

    // ファイルのMIME
    const _type = await FileType.fromBuffer(_buffer);

    if (_type === undefined) {
      continue;
    }

    // dom作成
    const _dom = document.createElement('img');
    _dom.src = `data:image/${_type.ext};base64,${_buffer.toString('base64')}`;
    _dom.width = 100;

    document.getElementById('app').appendChild(_dom);
    document.getElementById('app').appendChild(document.createElement('br'));
  }
};

main();
