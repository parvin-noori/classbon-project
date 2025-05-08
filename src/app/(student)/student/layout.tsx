
export default async function layout({children}: {children: React.ReactNode}) {
  return (
    <>
        <aside className="bg-gray-100 p-10">sidebar</aside>
        {children}
    </>
  )
}
