<template>
  <div class="container-fluid bg-cover bg-hero h-hero">
    <div class="row h-100 flex-row flex-lg-row-reverse">
      <div class="col-lg-6 d-flex justify-content-end mt-8 mt-lg-0">
        <!-- spline 3d -->
        <!-- <iframe
          src="https://my.spline.design/untitled-bd6c9e62c2394947f84b106c48d01355/"
          frameborder="0"
          width="100%"
          height="100%"
          class="d-none d-lg-block mt-5"
        ></iframe> -->
        <img
          src="../assets/images/sushi-shop-m_720x700.png"
          alt="sushiShop"
          class="d-none d-lg-block w-100 mt-4"
        />
        <img
          src="../assets/images/sushi-shop-m_720x700.png"
          alt="sushiShop"
          class="d-block d-lg-none h-hero-innerImg"
        />
      </div>
      <div class="offset-lg-1 col-lg-5 d-flex align-items-center">
        <div class="ms-5 pb-0 pb-lg-5 mt-lg-8">
          <h1 class="text-white h0">Get Soothing, Get Sushi!</h1>
          <p class="text-white mb-3">
            An NFT like no other, all you can eat. <br />
            A State-of-the-Art Suchi Bar
          </p>
          <button
            class="btn btn-outline-secondary rounded-pill px-4 fw-light me-3"
            type="button"
          >
            <router-link to="/" class="link-white fw-bold">
              View our roadmap
            </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-hero {
  background-image: url(../assets/images/HeroBanner_02-2.jpg);
}
</style>
