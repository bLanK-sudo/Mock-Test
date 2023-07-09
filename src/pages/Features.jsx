import NavBar from "../components/NavBar";

const Features = () => {


    return (
      <>
        <NavBar />
        <h2 class="p-4 text-2xl font-bold text-center">Features</h2>
        <div class="flex flex-col pb-24 m-2">
          <div className="flex items-center flex-col pt-12 gap-4">
            <div class="card max-w-[700px] border-2 border-accent">
              <h2 class="p-4 text-xl font-bold">Title</h2>
              <hr class="border-2 border-accent" />
              <div class="card-body">
                <div class="card-title"></div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
                  quia dolores libero eos. Quos numquam magnam eum maiores
                  ducimus reiciendis.
                </p>
                <div class="card-actions justify-end">
                  <button class="link">View More</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
}

export default Features;