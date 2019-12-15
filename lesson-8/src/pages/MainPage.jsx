import React from 'react';
import { connect } from 'react-redux';

// import needed actions

import Board from 'components/board/Board';
import Header from 'components/header/Нeader';
import SortPanel from 'components/sortPanel/SortPanel';
import Footer from 'components/footer/Footer';

const mapStateToProps = state => ({
  films: state.films.films,
});


const mapDispatchToProps = dispatch => ({
  
});


class MainPage extends React.Component {
  componentDidMount() {
    //fetch will be here
  }
  render() {
    const { films } = this.props;
    return (
      <>
        <Header />
        <div style={{ position: 'relative' }}>
          <SortPanel description={`${films.length} films found`} isFilter />
          <Board films={films} />
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
