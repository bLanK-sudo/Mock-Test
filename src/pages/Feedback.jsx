import NavBar from "../components/NavBar";

const FeedBack = () => {

  document.title = "FeedBacks";

  return (
    <>
      <NavBar />
      <h1 class="text-3xl text-center p-16 font-bold">FeedBacks</h1>
      <div class=" w-full flex justify-center ">
        <div class="w-max flex flex-col gap-2">
          <select id="sort" class="select select-accent min-w-[200px]">
            <option disabled selected>
              Filter by stars
            </option>
            <option>5 stars</option>
            <option>4 stars</option>
            <option>3 stars</option>
            <option>2 stars</option>
            <option>1 star</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 m-2 p-16">
        <article class="prose">
          <blockquote class="flex flex-col">
            <div class="rating pb-4">
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                checked
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
            </div>
            This website really helps me get to prepare for the mock exam. I
            really like how these two are putting effort to this and looking
            forward to more new features in the future
            <small class="py-4">Manish S</small>
          </blockquote>
        </article>
        <article class="prose">
          <blockquote class="flex flex-col">
            <div class="rating pb-4">
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                checked
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star bg-accent"
                disabled
              />
            </div>
            This website really helps me get to prepare for the mock exam. I
            really like how these two are putting effort to this and looking
            forward to more new features in the future
            <small class="py-4">Manish S</small>
          </blockquote>
        </article>
      </div>
    </>
  );
};

export default FeedBack;
