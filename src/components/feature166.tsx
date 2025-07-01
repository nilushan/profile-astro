export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface Feature166Props {
  heading: string;
  description?: string;
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
}

const Feature166 = (props: Feature166Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-bold text-base-content lg:max-w-3xl lg:text-5xl">
            {props.heading}
          </h1>
          <p className="text-center text-lg font-medium text-base-content/70 md:max-w-4xl lg:text-xl">
            {props.description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="relative flex w-full flex-col border border-base-300 md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="flex flex-col justify-between border-b border-base-300 p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-bold text-base-content">{props.feature1.title}</h2>
                <p className="text-base-content/70">{props.feature1.description}</p>
                <img
                  src={props.feature1.image}
                  alt={props.feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-2/5">
                <h2 className="text-xl font-bold text-base-content">{props.feature2.title}</h2>
                <p className="text-base-content/70">{props.feature2.description}</p>
                <img
                  src={props.feature2.image}
                  alt={props.feature2.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="relative flex flex-col border-t border-base-300 lg:flex-row">
              <div className="flex flex-col justify-between border-b border-base-300 p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-bold text-base-content">{props.feature3.title}</h2>
                <p className="text-base-content/70">{props.feature3.description}</p>
                <img
                  src={props.feature3.image}
                  alt={props.feature3.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-3/5">
                <h2 className="text-xl font-bold text-base-content">{props.feature4.title}</h2>
                <p className="text-base-content/70">{props.feature4.description}</p>
                <img
                  src={props.feature4.image}
                  alt={props.feature4.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature166 };
