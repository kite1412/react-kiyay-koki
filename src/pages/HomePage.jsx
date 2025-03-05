import bg from "../assets/landing-page-bg.png";

export default function HomePage() {
  return (
    <div
      className={`
        h-full w-full
      `}
    >
      <div class="relative">
        <div className={`
          absolute inset-0 bg-gradient-to-tr from-[rgb(40,40,40)] to-dark-teal-blue
          mix-blend-multiply
        `} />
        <img 
          src={bg}
          className=""
        />
      </div>

    </div>
  );
}