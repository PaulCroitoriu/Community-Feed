import React from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";

const ROOT_API = "https://api.stackexchange.com/2.2/";

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loading: true,
      error: "",
    };
  }

  componentDidMount() {
    const { match } = this.props;
    try {
      fetch(`${ROOT_API}questions/${match.params.id}?site=stackoverflow`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.setState({
              data,
              loading: false,
            });
          }
        });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: true,
      });
    }
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading || error) {
      return <Alert>{loading ? "Loading..." : error}</Alert>;
    }

    return (
      <QuestionWrapper>
        <Card key={data.items[0].question_id} data={data.items[0]} />
      </QuestionWrapper>
    );
  }
}

export default Question;
