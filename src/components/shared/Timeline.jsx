// import { BorderBeam } from "../magicui/border-beam";
import { education1, experiences, theme } from "@/constants";
import BoxReveal from "../magicui/box-reveal";

const Timeline = () => {
  return (
    <div className="mt-36 max-sm:mt-2 h-full flex max-md:px-5 md:w-[90%] lg:w-[65%] mx-auto  ">
      <div className="">
        <section className="m-5 ">
          <BoxReveal boxColor={theme} delay={2}>
            <h1 className="text-7xl max-xl:text-6xl max-sm:text-4xl my-7 font-bold">
              Education
            </h1>
          </BoxReveal>
          <ol className="flex flex-col gap-2 justify-center">
            <li>
              <BoxReveal boxColor={theme}>
                <p className="text-5xl max-xl:text-4xl max-sm:text-2xl font-semibold mb-2">
                {education1.name}
                </p>
              </BoxReveal>

              <BoxReveal boxColor={theme}>
                <p className="text-4xl max-xl:text-2xl max-sm:text-lg text-zinc-400">
                  {" "}
                  {education1.branch}
                  </p>
              </BoxReveal>

              <BoxReveal boxColor={theme}>
                <p className="text-3xl max-xl:text-xl max-sm:text-sm text-zinc-500 mb-5">
                  {education1.year}
                </p>
              </BoxReveal>
            </li>
          </ol>
        </section>

        <section className="m-5 mt-14">
          <div className="">
            <BoxReveal boxColor={theme}>
              <h1 className="text-7xl max-xl:text-6xl max-sm:text-4xl mb-7 font-bold">
                Experience
              </h1>
            </BoxReveal>
          </div>

          <ol className="flex flex-col gap-6 justify-center">
            {experiences.map((exp, index) => (
              <li key={index} className="mb-4">
                <BoxReveal boxColor={theme}>
                  <p className="text-5xl max-xl:text-4xl max-sm:text-2xl font-semibold my-2 ">
                    {exp.name}
                  </p>
                </BoxReveal>

                <BoxReveal boxColor={theme}>
                  <p className="text-4xl max-xl:text-2xl max-sm:text-lg text-zinc-400 mb-2">
                    {exp.moreInfo}
                  </p>
                </BoxReveal>

                <BoxReveal boxColor={theme}>
                  <p className="text-3xl max-xl:text-xl max-sm:text-sm text-zinc-500">
                    {exp.year}
                  </p>
                </BoxReveal>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Timeline;
