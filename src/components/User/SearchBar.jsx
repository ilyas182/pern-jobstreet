export default function SearchBar() {
    return(
    <>
    <form>
        <div>
            <input
            type="search"
            id="mySearch"
            name="q"
            placeholder="Search for job title"
            size="30" />
            <button>Search</button>
        </div>
    </form>
    </>
    )
}