const containerDiv = document.querySelector(".container");
const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const tarih = document.getElementById("tarih");

setTimeout(() => {
  loadingDiv.style.display = "none";
}, 3000);

let status = 0;
let veri = "";

const getImage = () => {
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Hata:${res.status}");
      }
      return res.json();
    })
    .then((data) => {
      veri = data;
      console.log(veri);
      show(data);
    })
    .catch((err) => (containerDiv.innerHTML = `<img src="./img/error.gif"/>`));

  const show = (catsShow) => {
    cardDiv.innerHTML = "";
    catsShow.forEach((image) => {
      cardDiv.innerHTML += `
            <div class="col-12 col-sm-6  col col-lg-4">
                <div style="height:200px;">
                    <img src="${image.url}" class="w-100 h-100" alt="...">
                </div>
            </div>
            `;
    });
  };
};

btn.addEventListener("click", () => {
  setTimeout(() => {
    cardDiv.innerHTML = `<img src="./img/loading.gif"/>`;
  }, 1000);
  getImage();
  loadingDiv.style.display = 'none';
});
getImage();

const outputDate = () => {
  let currentDate = new Date();
  let datedate = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();
  let currentDateTimeString = datedate + " <=> " + time;
  tarih.textContent = currentDateTimeString;
};
setInterval(() => {
  outputDate();
}, 1000);

containerDiv.style.display = "none";
setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.style.display = "block";
}, 2000);
