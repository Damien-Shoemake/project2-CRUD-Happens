const homeIdea      = document.getElementById("homeIdea");
const addBucketItem = document.getElementById("addBucketItem");

async function idea() {
  const parent = $(this).parent().parent().parent().parent().siblings(".hidden")
//   $(parent).toggleClass("show")
  $(parent).removeClass("hidden")
  $(parent).addClass("show")

  const response = await fetch("/bucketlist", {
    method: "GET",
  })
    .then((result) => {
      return result.json()
    })
    .then((result) => {
      let title = document.getElementById("card-title")
      title.innerHTML = result.item
    })

}
homeIdea.addEventListener("click", idea);

function addNewBucketItem () {
    console.log(addBucketItem);
    // here
}

addBucketItem.addEventListener("click", addNewBucketItem);

