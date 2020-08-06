import React from 'react'
import Highlighted from './highlighted';

const SearchRecord = (props) => {
    const { data, cursor, index, cardRef, setCursor, search, children } = props;
    if (children) {
        return (
            <div className="card-body">
                <p className="text-center">{children}</p>
            </div>
        )
    }
    return (
        <div tabIndex={data.id}
            className={`card ${cursor === index ? 'active' : null}`}
            ref={cursor === index ? cardRef : null}
            onMouseEnter={() => setCursor(index)}>

            <div className="card-body">
                <h5 className="card-id">
                    <Highlighted text={data.id} highlight={search} />
                </h5>
                <h6 className="card-name">
                    <Highlighted text={data.name} highlight={search} />
                </h6>
                <p className="card-address">
                    <Highlighted text={`${data.address} - ${data.pincode}`} highlight={search} />
                </p>

            </div>

        </div>
    )
}

export default SearchRecord
