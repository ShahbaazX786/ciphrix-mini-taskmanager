import { useTaskStore } from "@/lib/store/task.store";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Paginator = () => {
  const { page, setPage, totalPages } = useTaskStore();
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrev} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <PaginationItem key={i + 1}>
              <PaginationLink href="#">{i + 1}</PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
