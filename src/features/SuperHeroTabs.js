import React, { useEffect } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Table, CardImg, CardBody, CardTitle, Card } from 'reactstrap';
import { useParams, useNavigate } from "react-router-dom"

function SuperHeroTabs(props) {
    const { heroes } = props;
    const DEFAULT_ACTIVE_TAB = "list";
    const tabs = {
        "list": {
            title: "List",
            content: (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Super Hero Name</th>
                            <th>Real Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroes.map(hero => {
                            return (
                                <tr key={hero.id}>
                                    <td>{hero.id}</td>
                                    <td>{hero.name}</td>
                                    <td>{hero.biography["full-name"]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        },
        "grid": {
            title: "Grid",
            content: heroes.map(hero => {
                return (
                    <div className="w-25 p-3" style={{ display: "inline-block" }}>
                        <Card key={hero.id}>
                            <CardImg src={hero.image?.url} className="img-fluid" />
                            <CardBody>
                                <CardTitle tag="h5">{hero.name}</CardTitle>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        }
    }

    const { active_tab } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!active_tab) {
            navigate(`/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

    const toggle = tab => {
        if (active_tab !== tab) {
            navigate(`/${tab}`);
        }
    }

    return (
        <Container className="p-4">
            <Nav tabs>
                {
                    Object.entries(tabs).map((tab) => (
                        <NavItem key={tab[0]}>
                            <NavLink
                                className={active_tab === tab[0] ? "active" : ""}
                                onClick={() => {
                                    toggle(tab[0]);
                                }}
                                role="button"
                            >
                                {tab[1].title}
                            </NavLink>
                        </NavItem>
                    ))
                }
            </Nav>

            <TabContent activeTab={active_tab}>
                {
                    Object.entries(tabs).map((tab) => (
                        <TabPane key={tab[0]} tabId={tab[0]}>
                            {tab[1].content}
                        </TabPane>
                    ))
                }
            </TabContent>
        </Container>
    );
}

export default SuperHeroTabs;