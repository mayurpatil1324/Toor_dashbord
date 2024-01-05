import { Button } from "antd";
import React from "react";

const PaginationLink = ({ links }) => {
  return (
    <nav>
      <ul className="pagination d-flex" style={{ listStyle: 'none' }}>
        {links.map((link, index) => (
          <li
            key={index}
            className={`mx-4 page-item ${link.active ? "active" : ""}`}
          >
            {link.url ? (
              <p
                className="page-link"
                href={link.url}
              dangerouslySetInnerHTML={{ __html: link.label }}
              ></p>
            ) : (
              <span
                className="page-link"
              dangerouslySetInnerHTML={{ __html: link.label }}
              ></span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationLink;
