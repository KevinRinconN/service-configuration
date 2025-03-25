package com.microservice.publication.contexts.post.domain.usecases;

import com.microservice.common.utils.exception.NotFoundException;
import com.microservice.publication.contexts.post.domain.model.dto.LikeDto;
import com.microservice.publication.contexts.post.domain.model.dto.PostDto;
import com.microservice.publication.contexts.post.domain.port.repository.ILikeRepository;
import com.microservice.publication.contexts.post.domain.port.repository.IPostRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class LikePostUseCase {

    private final ILikeRepository iLikeRepository;
    private final PostGetByIdUseCase postGetByIdUseCase;

    public PostDto execute (String username, Long postId){
        Optional<LikeDto> existingLike = iLikeRepository.findByUserIdAndPost_Id(username, postId);

        if (existingLike.isPresent()) {
            iLikeRepository.delete(existingLike.get().getId());
        } else {
            PostDto post = postGetByIdUseCase.execute(postId);
            if (post == null) {
                throw new NotFoundException("Post no encontrado con ID: " + postId);
            }

            LikeDto like = LikeDto.builder()
                    .post(post)
                    .userId(username)
                    .build();

            iLikeRepository.create(like);


        }
        PostDto postUpdate = postGetByIdUseCase.execute(postId);
        // 🔥 Recuperar el post actualizado desde la BD
        return postUpdate;
    }
}
