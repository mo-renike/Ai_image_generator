import React, { useState, useEffect } from "react";
import { Loader, FormFields, Card } from "../components";
import { preview } from "../assets";
import Pagination from "../components/Pagination";

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map((post) => <Card key={post._id} {...post} />);
    } else {
        return (
            <h2 className="text-brand font-bold text-xl">{title}</h2>
        );
    }
};

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://dalle-hn3a.onrender.com/api/v1/post", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setAllPosts(result.data.reverse());
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleSearchChange = async (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(setTimeout(() => {

            const filteredPosts = allPosts.filter((post) =>
                post.prompt.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredPosts(filteredPosts);
            setLoading(false);

        }, 500)
        )
    }

    // set dynamic imgPerPage value according to screen size
    if (window.innerWidth <= 768) {
        var dynamicPerPage = 3;
    } else {
        dynamicPerPage = 6;
    }

    // implement pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(dynamicPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstRepo = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstRepo, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <section className="max-w-7xl mt-16 mx-auto">
            <div>
                <h1 className="text-text">Ai Generated Images</h1>
                <p className="mt-2 text-text max-w-[500px]">
                    Browse Through a collection of imaginative and visually stunning
                    images generated by the community
                </p>
            </div>
            <div className="mt-10">
                <FormFields
                    labelName="Search Posts"
                    type="text"
                    name="text"
                    placeholder="Search by prompt"
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>
            <div className="mt-2">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className="font-medium text-grey text-sm mb-3">
                                Showing results for{" "}
                                <span className="text-accent font-bold">"{searchText}"</span>
                            </h2>
                        )}
                        <div className="grid mt-10 lg:grid-cols-4 sm:grid-col-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {searchText ? (
                                <RenderCards
                                    data={filteredPosts}
                                    title="No search results found"
                                />
                            ) : (
                                <RenderCards data={allPosts} title="No posts found" />
                            )}
                        </div>
                    </>
                )}
            </div>
            {allPosts.length ? ( <Pagination
                allPosts={allPosts}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                paginate={paginate}
                pageNumbers={pageNumbers}
            />) : ""}
           
        </section>
    );
};

export default Home;
