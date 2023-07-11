export default function Layout({ children }) {
    return (
        <div className="w-screen h-screen overflow-y-auto " id="home">
            {children}
        </div>
    );
}