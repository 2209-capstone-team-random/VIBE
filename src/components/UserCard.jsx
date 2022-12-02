const UserCard = ({ user }) => {
  return (
    <div className="flex p-4 flex-col w-[250px] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer bg-white/5">
      <div className="relative w-full h-56 group">
        <div className="absolute inset-0 justify-center items-center"></div>
        <img
          className="h-[150px] justify-center"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d77a0f99-997c-4694-9ea9-d1bd2cd9f4f0/deucehb-14a7e9d8-ec31-4d6b-a623-c9790fa1d7dc.png/v1/fill/w_473,h_700,strp/patrick_star_wood_on_his_head_by_marx290_deucehb-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzAwIiwicGF0aCI6IlwvZlwvZDc3YTBmOTktOTk3Yy00Njk0LTllYTktZDFiZDJjZDlmNGYwXC9kZXVjZWhiLTE0YTdlOWQ4LWVjMzEtNGQ2Yi1hNjIzLWM5NzkwZmExZDdkYy5wbmciLCJ3aWR0aCI6Ijw9NDczIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.c98t8lweTQ34G2Kd91f2WfFUhc797WTv11jdd15NNlA"
        />
      </div>
      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-2xl truncate">Peter</p>
        <p className="test-sm truncate text-gray-300 mt-1">{user.genre}</p>
      </div>
    </div>
  );
};

export default UserCard;
