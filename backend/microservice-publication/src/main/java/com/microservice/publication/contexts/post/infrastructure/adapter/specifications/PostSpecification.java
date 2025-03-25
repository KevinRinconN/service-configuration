package com.microservice.publication.contexts.post.infrastructure.adapter.specifications;

import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.LikeEntity;
import com.microservice.publication.contexts.post.infrastructure.adapter.persistence.entities.PostEntity;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecification {

    public static Specification<PostEntity> hasUser(String username) {
        return (root, query, criteriaBuilder) -> {
            if (username == null) {
                return criteriaBuilder.conjunction(); // No aplica ningún filtro si username es nulo
            }
            return  criteriaBuilder.like(root.get("userId"), "%" + username + "%");
        };
    }

    public static Specification<PostEntity> hasLikedByUser(String username) {
        return (root, query, criteriaBuilder) -> {
            if (username == null) {
                return criteriaBuilder.conjunction(); // No aplica filtro si el username es nulo
            }

            // Subquery para buscar posts donde el usuario ha dado like
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<LikeEntity> likeRoot = subquery.from(LikeEntity.class);

            subquery.select(likeRoot.get("post").get("id")) // Obtener los IDs de los posts con like
                    .where(criteriaBuilder.equal(likeRoot.get("userId"), username));

            return root.get("id").in(subquery);
        };
    }
}
