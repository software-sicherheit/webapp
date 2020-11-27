const saveAsc = (pem, fileName) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  const blob = new Blob([pem], { type: 'text/plain' });
  console.log(blob);
  const url = window.URL.createObjectURL(blob);
  console.log(url);
  a.href = url;
  a.download = `${fileName}.asc`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export default saveAsc;
