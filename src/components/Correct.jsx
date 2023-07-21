import { BsCheckCircleFill, BsXCircleFill } from "solid-icons/bs";
import { createSignal, children } from "solid-js";
import { FaSolidCircleXmark } from "solid-icons/fa";
const Correct = (props) => {
  const [test, setTest] = createSignal(null);
  let mainQnDiv;
  let ansDiv;
  setTest(props.qnArr);
  return (
    <>
      <div className="absolute overflow-scroll top-0 bg-base-300 w-full h-screen m-auto left-0 right-0 p-4 flex-col z-[10] pb-24">
        <h1 class="text-xl font-archivo link text-center p-4">ANSWERS</h1>

        <Show
          when={test()}
          fallback={
            <>
              <div class="col-span-2 h-36 flex justify-center font-archivo m-2 bg-base-100 items-center gap-4 animate-pulse rounded-xl">
                <p>Content is still Loading...</p>
              </div>
            </>
          }>
          <For each={test().questions}>
            {(qn, i) => {
              return (
                <>
                  <div
                    ref={mainQnDiv}
                    class={`qns qns${qn.qn_no} card m-2 border-4 border-error bg-bsae-300 col-span-2`}>
                    <div class="flex justify-between p-4">
                      <h2>Question {i() + 1}</h2>
                      <p>Marks : {qn.marks}</p>
                    </div>
                    <hr class="border border-accent" />
                    <div class="card-body">
                      <div class="card-actions flex-col">
                        <div class="card-title flex-col items-start">
                          {qn.images && (
                            <For each={qn.images}>
                              {(img) => {
                                return (
                                  <>
                                    <img
                                      src={img}
                                      class="cursor-pointer p-2 bg-white rounded-lg"
                                    />
                                  </>
                                );
                              }}
                            </For>
                          )}
                          <p class="p-2">
                            {qn.text == null ? "null" : qn.text}
                          </p>
                          <div
                            ref={ansDiv}
                            class="form-control flex flex-col gap-4"
                            id={`form${qn.qn_no}`}>
                            {qn.type == "Numeric" && (
                              <BsXCircleFill class="text-error" />
                              // <input
                              //   class="input input-bordered  input-accent"
                              //   type="number"
                              //   disabled
                              //   name={"q" + qn.qn_no}
                              //   id={"preview" + qn.id}
                              // />
                            )}
                            {qn.type == "Text" && (
                              <>
                                <BsCheckCircleFill />
                                {/* <input
                                  disabled
                                  class="input input-bordered input-accent"
                                  type="text"
                                  name={"q" + qn.qn_no}
                                  id={"preview" + qn.qn_no}
                                /> */}
                              </>
                            )}
                            {qn.type == "SCQ" && (
                              <For each={qn.choices}>
                                {(ans, i) => {
                                  return (
                                    <div class="flex gap-2 items-center min-w-[16]">
                                      <BsXCircleFill class="text-error" />
                                      {/* <input
                                        disabled
                                        class="radio radio-accent bg-black"
                                        type="radio"
                                        id={"preview" + ans.id}
                                        name={"q" + qn.qn_no}
                                        value={ans.id}
                                      /> */}

                                      {ans.image ? (
                                        ans.image instanceof Array ? (
                                          <For each={ans.image}>
                                            {(img) => {
                                              <label
                                                for={"preview" + ans.id}
                                                class="cursor-pointer">
                                                {" "}
                                                <img
                                                  src={img}
                                                  class="  p-2 bg-white rounded-lg"
                                                />
                                              </label>;
                                            }}
                                          </For>
                                        ) : (
                                          <label
                                            for={"preview" + ans.id}
                                            class="cursor-pointer">
                                            {" "}
                                            <img
                                              src={ans.image}
                                              class=" p-2 bg-white rounded-lg"
                                            />
                                          </label>
                                        )
                                      ) : (
                                        <label
                                          class="w-16 min-w-max cursor-pointer p-2"
                                          for={"preview" + ans.id}>
                                          {ans.text == null ? "null" : ans.text}
                                        </label>
                                      )}
                                    </div>
                                  );
                                }}
                              </For>
                            )}
                            {qn.type == "MCQ" && (
                              <For each={qn.choices}>
                                {(ans, i) => {
                                  return (
                                    <div class="flex gap-2 items-center">
                                      <BsCheckCircleFill class="text-error" />
                                      {/* <input
                                        disabled
                                        class="checkbox checkbox-accent"
                                        type="checkbox"
                                        id={"previewmcq" + ans.id}
                                        name={"q" + qn.qn_no}
                                        value={ans.id}
                                      /> */}
                                      {ans.image ? (
                                        ans.image instanceof Array ? (
                                          <For each={ans.image}>
                                            {(img) => {
                                              <label
                                                for={"previewmcq" + ans.id}
                                                class="cursor-pointer">
                                                {" "}
                                                <img
                                                  src={img}
                                                  class=" p-2 bg-white rounded-lg"
                                                />
                                              </label>;
                                            }}
                                          </For>
                                        ) : (
                                          <label
                                            for={"previewmcq" + ans.id}
                                            class="cursor-pointer">
                                            {" "}
                                            <img
                                              src={ans.image}
                                              class=" p-2 bg-white rounded-lg"
                                            />
                                          </label>
                                        )
                                      ) : (
                                        <label
                                          class="w-16 min-w-max cursor-pointer p-2"
                                          for={"preview" + ans.id}>
                                          {ans.text == null ? "null" : ans.text}
                                        </label>
                                      )}
                                    </div>
                                  );
                                }}
                              </For>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </For>
        </Show>
        {props.children}
      </div>
    </>
  );
};

export default Correct;
