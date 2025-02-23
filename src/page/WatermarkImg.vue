<!-- 添加水印 -->
<template>
  <div>
    <input
      type="file"
      @change="chooseFile"
    >
    <section class="show-area">
      <div class="preview">
        <img
          :src="file"
          alt=""
        >
      </div>
      <div class="watermark-preview">
        <img
          :src="waterMarkFile"
          alt=""
        >
      </div>
    </section>
  </div>
</template>
<script setup>
const file = ref();
const waterMarkFile = ref();

const transFileToBase64 = (img) => {
    const fileReader = new FileReader();
      fileReader.onload = () => {
        const baseData = fileReader.result;
        file.value = baseData;
        addWaterMark(baseData)
      };

      fileReader.readAsDataURL(img);
}


const chooseFile = (e) => {
    console.log('e.target', e.target.files[0])
    const file = e.target.files[0];
    transFileToBase64(file);
    e.target.value = '';
}   

const addWaterMark = (baseData) => {
    const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const waterImg = new Image();
      const MAX_WH = 800; //图片的最大宽高比，因为在以上方法中获取的照片size太大，上传时耗时太多所以需要做处理
      waterImg.crossOrigin = "Anonymous";
      return new Promise((rs) => {
        waterImg.onload =  () => {
          //这里是一个异步，所以获取到的base64文件需要用回调
          if (waterImg.height > MAX_WH) {
            waterImg.width *= MAX_WH / waterImg.height;
            waterImg.height = MAX_WH;
          }
          if (waterImg.width > MAX_WH) {
            waterImg.height *= MAX_WH / waterImg.width;
            waterImg.width = MAX_WH;
          }
          canvas.height = waterImg.height;
          canvas.width = waterImg.width;
          ctx.drawImage(waterImg, 0, 0, waterImg.width, waterImg.height);
          ctx.font = `30px Arial`;
          ctx.fillStyle = "tomato";
          let time = getCurTime(); //获取当前的时间
          ctx.textAlign = "end";
          let str = `${time}`;
          let lineheight = 30;
          let lines = str.split("\n");

          for (let j = 0; j < lines.length; j++) {
            ctx.fillText(
              lines[j],
              waterImg.width - 20,
              waterImg.height - (j + 1) * lineheight
            );
          }
          ctx.textBaseline = "middle";
          let dataURL = canvas.toDataURL("image/png/jpg");
          waterMarkFile.value = dataURL;
          rs(dataURL);
        };

        waterImg.src = baseData;
      });
}


const getCurTime = () =>  {
        const DateObj = new Date();
        const year = DateObj.getFullYear();
        const month = DateObj.getMonth() + 1;
        const date = DateObj.getDate();
        const hour = DateObj.getHours();
        const minute = DateObj.getMinutes();
        const second = DateObj.getSeconds();

        const padZero = function(num) {
            return num < 10 ? `0${num}` : num;
        }

        return `${year}-${padZero(month)}-${padZero(date)} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
    }

</script>
<style lang="scss">
    .show-area {
        display: flex;
        justify-content: space-between;

        .preview,
        .water-mark-preview {
            flex: 1;
        }

        .preview {
            img {
                max-width: 800px;
                object-fit: contain;
            }
        }
    }
</style>