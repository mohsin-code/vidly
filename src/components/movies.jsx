import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from './utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [{ _id:'', name: 'All Genres'}, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }
    
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = this.state.movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !(movies[index].liked);
        this.setState({movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    }
    
    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPagedData = () => {
        const { searchQuery, pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;
        
        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id) 
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    }

    render() { 
        const { length: count } = this.state.movies;
        const { searchQuery, pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;
        
        const { totalCount, data: movies } = this.getPagedData();

        if(count === 0) return <p className='m-2'>There are no movies available.</p>
        else
            return (
                <div className='row'>
                    <div className="col-3">
                        <ListGroup 
                            items = {genres}
                            selectedItem = {selectedGenre}
                            onItemSelect = {this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <Link to="/movies/new" className="btn btn-primary m-2">Add New Movie</Link>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                        <p className="m-2">Showing {totalCount} movies in the database.</p>
                        <MoviesTable 
                            movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        < Pagination 
                            itemsCount={totalCount} 
                            pageSize={pageSize} 
                            onPageChange={this.handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            );
    }
}

export default Movies;