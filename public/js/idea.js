const homeIdea = document.getElementById("homeIdea")

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
      let ideaResult = (title.innerHTML = result.item)

      console.log(result)
      console.log(result.item)

      let addBucketItem = document.getElementById("addBucketItem")
      console.log(addBucketItem)

      addBucketItem.onclick = () => {
        // add "ideaResult" to localStorage
        localStorage.setItem("idea", ideaResult)
        const bucketItem = document.getElementById("theBucketItem")
        const bucketList = document.getElementById("theBucketList")
        bucketList.removeAttribute("class")
        bucketItem.textContent = result.item
      }
    })
}
homeIdea.addEventListener("click", idea)
